import json, re, os

orig_path = r"C:\Users\User\.gemini\antigravity\scratch\inteks-original\app.js"
dest_dir = r"C:\Users\User\.gemini\antigravity\scratch\inteks-studio\src\data"
os.makedirs(dest_dir, exist_ok=True)

with open(orig_path, "r", encoding="utf-8") as f:
    content = f.read()

match = re.search(r"const GALLERY_DATA = (\[.*?\]);", content, re.DOTALL)
if match:
    items = json.loads(match.group(1))
    for it in items:
        b = it.get("badge", "").lower()
        t = it.get("title", "").lower()
        if any(k in b or k in t for k in ["спальн", "жатын", "төсек", "сюита"]):
            it["category"] = "bedroom"
        elif any(k in b or k in t for k in ["асүй", "асхан", "мейрамхана"]):
            it["category"] = "kitchen"
        elif any(k in b or k in t for k in ["минимал", "блэкаут", "скандинав", "терраса", "кант", "қара"]):
            it["category"] = "minimal"
        elif any(k in b or k in t for k in ["эркер", "панорам", "баспалдақ"]):
            it["category"] = "erker"
        elif any(k in b or k in t for k in ["ателье", "декор", "қолөнер", "фурнитур", "кесте", "кисть", "раушан", "жапырақ"]):
            it["category"] = "atelier"
        else:
            it["category"] = "living"

    js_content = f"export const GALLERY_DATA = {json.dumps(items, ensure_ascii=False, indent=2)};\n"
    with open(os.path.join(dest_dir, "gallery.js"), "w", encoding="utf-8") as f:
        f.write(js_content)
    print("Created src/data/gallery.js with", len(items), "items")
