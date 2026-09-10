html = """<!doctype html>
<html lang="kk" class="dark">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/png" href="/assets/img/inteks-crest-icon.png" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>INTEKS — Haute Couture Салон Штор | Шымкент • Түркістан • Қызылорда</title>
    <meta name="description" content="Шымкенттегі элиталық резиденциялар мен заманауи пәтерлерге арналған авторлық салон штор. 60 нақты жоба, 1 500+ мата, ақылды электрокарниздер." />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700;800&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
  </head>
  <body class="bg-[#070709] text-[#F5F3EF] selection:bg-[#C5A059] selection:text-black overflow-x-hidden font-sans">
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
"""
with open(r"C:\Users\User\.gemini\antigravity\scratch\inteks-studio\index.html", "w", encoding="utf-8") as f:
    f.write(html)
print("Updated index.html")
