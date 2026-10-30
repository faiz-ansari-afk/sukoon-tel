import os
from PIL import Image, ImageDraw, ImageFont

def create_icons():
    sheet_path = 'Nageena Ayurvedic Icon Asset Sheet.png'
    if not os.path.exists(sheet_path):
        raise FileNotFoundError(f"Missing {sheet_path}")

    sheet = Image.open(sheet_path).convert('RGB')
    
    # 1. Extract pure gold favicon (384, 56, 561, 229) -> 177 x 173
    fav_crop = sheet.crop((384, 56, 561, 229))
    
    # Create an antialiased rounded mask for the gold icon
    scale = 4
    w, h = fav_crop.size
    large_mask = Image.new('L', (w * scale, h * scale), 0)
    draw = ImageDraw.Draw(large_mask)
    draw.rounded_rectangle([(0, 0), (w * scale - 1, h * scale - 1)], radius=32 * scale, fill=255)
    mask = large_mask.resize((w, h), Image.Resampling.LANCZOS)
    
    gold_icon = fav_crop.convert('RGBA')
    gold_icon.putalpha(mask)
    
    # Square version with padding
    dim = max(w, h)
    gold_square = Image.new('RGBA', (dim, dim), (0, 0, 0, 0))
    gold_square.paste(gold_icon, ((dim - w) // 2, (dim - h) // 2), gold_icon)

    # 2. Output Favicons
    sizes = [16, 32, 48]
    ico_images = [gold_square.resize((s, s), Image.Resampling.LANCZOS) for s in sizes]
    ico_images[0].save('public/favicon.ico', format='ICO', sizes=[(16, 16), (32, 32), (48, 48)])
    print("Created public/favicon.ico")

    for s in [16, 32, 48]:
        png_fav = gold_square.resize((s, s), Image.Resampling.LANCZOS)
        png_fav.save(f'public/favicon-{s}x{s}.png')
        print(f"Created public/favicon-{s}x{s}.png")
    
    ico_images[1].save('public/favicon.png')

    # 3. Apple Touch Icons (Non-transparent, cream background with gold icon)
    for s in [180, 152, 120]:
        apple_icon = Image.new('RGB', (s, s), '#FAF7F0')
        target_size = int(s * 0.94)
        scaled_gold = gold_square.resize((target_size, target_size), Image.Resampling.LANCZOS)
        offset = (s - target_size) // 2
        apple_icon.paste(scaled_gold, (offset, offset), scaled_gold)
        name = 'apple-touch-icon.png' if s == 180 else f'apple-touch-icon-{s}.png'
        apple_icon.save(f'public/{name}')
        print(f"Created public/{name}")

    # 4. Standard PWA Icons (icon-192.png, icon-512.png, manifest-icon-512.png)
    for s in [192, 512]:
        pwa_icon = gold_square.resize((s, s), Image.Resampling.LANCZOS)
        pwa_icon.save(f'public/icon-{s}.png')
        print(f"Created public/icon-{s}.png")
    
    # manifest-icon-512.png
    manifest_512 = Image.new('RGBA', (512, 512), (0, 0, 0, 0))
    scaled_manifest = gold_square.resize((500, 500), Image.Resampling.LANCZOS)
    manifest_512.paste(scaled_manifest, (6, 6), scaled_manifest)
    manifest_512.save('public/manifest-icon-512.png')
    print("Created public/manifest-icon-512.png")

    # 5. Maskable PWA Icons (maskable-192.png, maskable-512.png)
    for s in [192, 512]:
        maskable = Image.new('RGB', (s, s), '#1B5E20')
        content_size = int(s * 0.72)
        scaled_gold = gold_square.resize((content_size, content_size), Image.Resampling.LANCZOS)
        offset = (s - content_size) // 2
        maskable.paste(scaled_gold, (offset, offset), scaled_gold)
        maskable.save(f'public/maskable-{s}.png')
        print(f"Created public/maskable-{s}.png")

    # 6. Generate og-image.jpg (1200 x 630)
    og_w, og_h = 1200, 630
    og = Image.new('RGB', (og_w, og_h), '#FAF7F0')
    draw_og = ImageDraw.Draw(og)

    # Decorative borders
    draw_og.rectangle([(16, 16), (og_w - 17, og_h - 17)], outline='#E2DAC8', width=2)
    draw_og.rectangle([(24, 24), (og_w - 25, og_h - 25)], outline='#D4A34D', width=2)

    # Corner accents
    accent_len = 36
    draw_og.line([(24, 24), (24 + accent_len, 24)], fill='#1B5E20', width=5)
    draw_og.line([(24, 24), (24, 24 + accent_len)], fill='#1B5E20', width=5)
    draw_og.line([(og_w - 25 - accent_len, og_h - 25), (og_w - 25, og_h - 25)], fill='#1B5E20', width=5)
    draw_og.line([(og_w - 25, og_h - 25 - accent_len), (og_w - 25, og_h - 25)], fill='#1B5E20', width=5)

    # Large Emblem on left side
    emblem_size = 460
    emblem = gold_square.resize((emblem_size, emblem_size), Image.Resampling.LANCZOS)
    og.paste(emblem, (55, (og_h - emblem_size) // 2), emblem)

    # Fonts
    font_bold = ImageFont.truetype("C:\\Windows\\Fonts\\segoeuib.ttf", 46) if os.path.exists("C:\\Windows\\Fonts\\segoeuib.ttf") else ImageFont.load_default()
    font_sub = ImageFont.truetype("C:\\Windows\\Fonts\\segoeuib.ttf", 26) if os.path.exists("C:\\Windows\\Fonts\\segoeuib.ttf") else ImageFont.load_default()
    font_body = ImageFont.truetype("C:\\Windows\\Fonts\\segoeui.ttf", 19) if os.path.exists("C:\\Windows\\Fonts\\segoeui.ttf") else ImageFont.load_default()
    font_badge = ImageFont.truetype("C:\\Windows\\Fonts\\segoeuib.ttf", 18) if os.path.exists("C:\\Windows\\Fonts\\segoeuib.ttf") else ImageFont.load_default()
    
    # Devanagari Hindi font
    hindi_font_path = "C:\\Windows\\Fonts\\Nirmala.ttc"
    font_hindi = ImageFont.truetype(hindi_font_path, 24) if os.path.exists(hindi_font_path) else font_sub

    # Right side text block
    tx = 540
    # Top badge: "AUTHENTIC AYURVEDIC SHOWCASE"
    draw_og.rounded_rectangle([(tx, 65), (tx + 360, 102)], radius=6, fill='#1B5E20')
    draw_og.text((tx + 20, 73), "AUTHENTIC AYURVEDIC SHOWCASE", font=font_badge, fill='#FFFFFF')

    # Main Brand Title
    draw_og.text((tx, 118), "Nageena Ayurvedic Agency", font=font_bold, fill='#0D381E')

    # Gold separator line
    draw_og.line([(tx, 185), (tx + 600, 185)], fill='#D4A34D', width=3)

    # English Tagline from asset sheet
    draw_og.text((tx, 205), "Original Nageena Ayurvedic Products", font=font_sub, fill='#1B5E20')
    draw_og.text((tx, 242), "Now Available in Sherkot, Bijnor", font=font_sub, fill='#8A6218')

    # Hindi Subtitle
    draw_og.text((tx, 288), "असली नगीना आयुर्वेदिक उत्पाद — शेरकोट, बिजनौर (उ.प्र.)", font=font_hindi, fill='#144D29')

    # Product highlights badge row
    draw_og.rounded_rectangle([(tx, 335), (tx + 600, 395)], radius=8, fill='#EFE8D8', outline='#D6CAAF', width=1)
    draw_og.text((tx + 18, 350), "Sukoon Oil  •  Onion Hair Oil  •  Rehnuma Kesh Tel  •  Sukoon Pain Killer", font=font_body, fill='#1E293B')

    # Location & Contact Cards
    draw_og.rounded_rectangle([(tx, 415), (tx + 600, 495)], radius=8, fill='#FFFFFF', outline='#C5D6C9', width=1)
    draw_og.text((tx + 20, 428), "Location: Chungi No. 5, Mohalla Khurara, Sherkot, Bijnor (UP)", font=font_body, fill='#334155')
    draw_og.text((tx + 20, 460), "Direct Helpline / WhatsApp: +91 94121 34692", font=font_body, fill='#0D381E')

    # Footer note / URL with clear separation
    draw_og.text((tx, 530), "Genuine Bhiwandi Pharmacy Formulations", font=font_badge, fill='#64748B')
    draw_og.text((tx + 380, 530), "nageenaayurvedicsherkot.in", font=font_badge, fill='#1B5E20')

    og.save('public/og-image.jpg', quality=95)
    print("Created public/og-image.jpg")

    # Clean up test files
    for tf in ['public/images/test_hindi_font.png']:
        if os.path.exists(tf):
            try:
                os.remove(tf)
            except Exception:
                pass

if __name__ == '__main__':
    create_icons()
