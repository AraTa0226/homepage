file_path = r'c:\Users\Taiji\Desktop\Ai-projects\ang-homepage\src\data\cms.json'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()
    pos = 44002
    start = max(0, pos - 50)
    end = min(len(content), pos + 50)
    print(f"Char at {pos}: '{content[pos]}'")
    print(f"Snapshot: ...{content[start:end]}...")
