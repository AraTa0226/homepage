file_path = r'c:\Users\Taiji\Desktop\Ai-projects\ang-homepage\src\data\cms.json'
with open(file_path, 'r', encoding='utf-8') as f:
    text = f.read()

# Find the dashcam category
start_marker = '"id": "dashcam"'
start_idx = text.find(start_marker)
if start_idx == -1:
    print("Could not find dashcam category")
    sys.exit(1)

# Find the end of this category object
brace_count = 1
i = text.find('{', start_idx) + 1
while brace_count > 0 and i < len(text):
    if text[i] == '{': brace_count += 1
    if text[i] == '}': brace_count -= 1
    i += 1

dashcam_text = text[start_idx-2:i] # roughly the category object

# Count in dashcam_text
print(f"Brace count in dashcam section: {dashcam_text.count('{')} opening, {dashcam_text.count('}')} closing")
print(f"Bracket count in dashcam section: {dashcam_text.count('[')} opening, {dashcam_text.count(']')} closing")
