import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client
let ai: GoogleGenAI | null = null;
const apiKey = process.env.GEMINI_API_KEY;

if (apiKey && apiKey !== "MY_GEMINI_API_KEY") {
  try {
    ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
    console.log("Gemini AI client successfully initialized server-side.");
  } catch (e) {
    console.error("Failed to initialize Gemini AI client:", e);
  }
} else {
  console.log("GEMINI_API_KEY is not configured or has default value. AI Advisor will run in hospitable fallback mode.");
}

// Fallback response list if Gemini is unavailable
const ArabicFallbacks = [
  "أهلاً بك يا ضيفنا العزيز في ديوان السلطان! 👑\nنوصيك بشدة لتجربة **مندي اللحم البلدي الفاخر** (لحم تيس دايب مطهو تحت الأرض لمدة ٦ ساعات كاملة) أو **صينية السعادة** للجمعات العائلية الرائعة.\nهل تود معرفة تفاصيل أكثر عن أي طبق؟",
  "يا هلا ومرحب! نورت مطعم مندي السلطان بالمهندسين 🍽️\nإذا كنتم مجموعة من ٤ أفراد، فإن **صينية السعادة** هي الاختيار المثالي الذي يجمع لحم المندي الضاني والدجاج والمشويات والممبار وورق العنب!\nهل تحب اللحوم أم الدواجن أكثر لنساعدك؟",
  "مرحباً بك يا غالي! في مندي السلطان نحضر اللحم على الطريقة الحضرمية الأصلية ببطء تحت الأرض مع جمر الفحم الطبيعي 🔥\nأنصحك أيضاً بتجربة **موزة السلطان الفاخرة** أو **الحنيذ المطهو بورق الموز**.\nهل تفضل المأكولات السبايسي أم العادية؟"
];

// POST API route for food advisor chat
app.post("/api/advisor", async (req, res) => {
  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Invalid messages array" });
    }

    // If Gemini is not available or failed to initialize, use simulated hospitable Arab advisor answers
    if (!ai) {
      console.log("Using local hospitable fallback response due to missing or uninitialized GEMINI_API_KEY");
      // Choose a random fallback or match keywords
      const lastMessage = messages[messages.length - 1]?.text?.toLowerCase() || "";
      let fallbackText = ArabicFallbacks[0];

      if (lastMessage.includes("عائلة") || lastMessage.includes("مجموعة") || lastMessage.includes("صينية") || lastMessage.includes("صواني") || lastMessage.includes("أفراد")) {
        fallbackText = ArabicFallbacks[1];
      } else if (lastMessage.includes("طريقة") || lastMessage.includes("كيف") || lastMessage.includes("المندي") || lastMessage.includes("حفرة")) {
        fallbackText = ArabicFallbacks[2];
      }

      // Add a friendly disclaimer inside the chat
      return res.json({
        text: fallbackText + "\n\n*(ملاحظة: يعمل المستشار حالياً بوضع الترحيب التلقائي السريع لمساعدتك فوراً)*"
      });
    }

    // Build chat structure or prompt from previous messages
    // The last message is the latest query
    const userPrompt = messages[messages.length - 1]?.text || "مرحباً";

    // Build full context for Gemini
    const systemInstruction = `أنت "مستشار السلطان الذكي"، مساعد التوجيه والضيافة الودود والمحترف في مطعم "مندي السلطان" الشهير بالمهندسين، الجيزة (هاتف: +20 11 48333036، العنوان: مدور المهندس شريف اسماعيل، المهندسين، الجيزة).
تجيب دائمًا باللغة العربية بلهجة مصرية ترحيبية ودودة جداً تفيض بالكرم وحسن الضيافة العربي، وتستخدم إيموجي مناسبة مثل (👑, 🍗, 🥩, 🍚, 🔥, 🍽️).
وظيفتك هي مساعدة الضيوف في اختيار ألذ الوجبات والصواني المناسبة لهم بناءً على شهيتهم، عدد الأفراد، ميزانيتهم، وما يفضلونه.

منيو مطعمنا يشمل:
1. لحوم المندي والحنيذ البلدي الفاخرة:
   - مندي لحم بلدي (ثمن تيس) بـ 950 ج.م (لذيذ جداً ومطبوخ ببطء تحت الأرض لمدة 6 ساعات).
   - حنيذ لحم بلدي كتف كامل بـ 3600 ج.م (مطبوخ بورق الموز والقصدير ليكون طرياً جداً ودايباً).
   - موزة السلطان الفاخرة بـ 890 ج.م (موزة ضاني مشوية ببطء شديد تقدم فوق أرز بسمتي بالخلطة والمكسرات والزبيب).
   - نفر لحم حنيذ أو مندي بـ 490 ج.م (وجبة فردية مشبعة).
2. أطباق الدواجن اللذيذة:
   - دجاج مندي السلطان (نصف دجاجة بـ 190 ج.م، دجاجة كاملة بـ 370 ج.م).
   - دجاج مضغوط يمني (نصف بـ 210 ج.م، كاملة بـ 400 ج.م).
   - دجاج مظبي مشوي على الحجر البركاني الساخن على الفحم (نصف بـ 200 ج.م، كاملة بـ 380 ج.م).
3. الصواني السلطانية للعائلات والعزومات الفخمة:
   - صينية السعادة بـ 2450 ج.م (تكفي 4 أفراد: ربع تيس مندي دايب + نصف دجاجة مندي + نصف كيلو كفتة مشوية + ممبار وورق عنب + سيرفيس أرز بسمتي فاخر + دقوس وطحينة).
   - صينية السلطان الملكية بـ 4900 ج.م (تكفي 6 إلى 8 أفراد: نصف تيس مندي كامل كتف ورقبة + دجاجة مندي كاملة + 1 كيلو كفتة وطرب + سيرفيس أرز بالمكسرات + مقبلات وسلطات).
   - صينية لِـمّـة الحبايب بـ 1550 ج.م (تكفي 3 أفراد: 3 قطع لحم مندي بلدي + نصف دجاجة + شيش طاووق وكفتة + أرز بالخلطة والمكسرات + 3 سلطات).
4. مشويات الفحم الطازجة:
   - كيلو مشكل مشويات السلطان بـ 880 ج.م (كباب، كفتة، شيش، طرب مع عيش بلدي وطحينة).
   - كفتة ضاني بلدي (كيلو بـ 790 ج.م).
   - ريش ضاني بلدي مشوية ببطء (كيلو بـ 1150 ج.م).
5. مقبلات وسلطات تفتح النفس:
   - طبق مقبلات السلطان المشكل بـ 190 ج.م (ورق عنب، ممبار، سمبوسك لحمة وجبنة، طحينة، دقوس، بابا غنوج).
   - ممبار بلدي فاخر بـ 120 ج.م.
   - ورق عنب بالليمون ودبس الرمان بـ 90 ج.م.
   - سمبوسك مشكل 6 قطع بـ 85 ج.م.
   - سلطة دقوس حارة بـ 25 ج.م.
6. الحلويات الملكية والمشروبات:
   - كنافة السلطان بالقشطة والفسدق الحلبي بـ 110 ج.م.
   - أم علي بالمكسرات والقشطة والزبدة بـ 120 ج.م.
   - مشروبات غازية كانز بـ 35 ج.م.

قواعد مهمة للإجابة:
- ارحب بالضيف كأنه سلطان زائر لديوانك.
- لا تذكر أسعار غير حقيقية، استخدم دائماً الأسعار والوجبات المذكورة في الأعلى فقط!
- شجعهم على إضافة الطلبات إلى سلة التسوق لتأكيد طلبهم عبر الواتساب بنقرة واحدة.
- ركز على لذة الطعم والمذاق الأصيل واللحم البلدي الضاني "الدايب دوب".
- اختصر الإجابة لتكون ممتعة وسهلة القراءة ومقسمة بشكل مريح للعين ومحفزة للشهية.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: userPrompt,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.8,
      }
    });

    const reply = response.text || "أهلاً بك يا فندم! كيف يمكن لمستشار السلطان أن يسعدك اليوم؟";
    return res.json({ text: reply });

  } catch (error) {
    console.error("Error in /api/advisor endpoint:", error);
    return res.json({
      text: "أهلاً بك يا غالي! واجهت مشكلة صغيرة في الاتصال بمجلس السلطان، ولكن ننصحك بشدة بطلب **صينية السعادة الفاخرة** أو **مندي اللحم البلدي الدايب** اليوم! كيف يمكننا خدمتك؟ 🔥🍖"
    });
  }
});

// API endpoint for general health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", restaurant: "Mandi El Sultan" });
});

// Setup Vite Dev Server / Static Files
async function setupServer() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting in development mode with Vite middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Starting in production mode serving static dist files...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running successfully on port ${PORT}`);
  });
}

setupServer();
