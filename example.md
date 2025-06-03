---
marp: true
theme: default
paginate: true
title: gs-mark2slides Demo Presentation
---

# gs-mark2slides Demo

Convert Marp presentations to Google Slides

---

## Features

- 📝 Full Marp syntax support
- 🎨 Preserve formatting
- 🔐 Secure authentication
- ⚡ Fast conversion

---

## Code Example

```javascript
const converter = new MarpToGoogleSlidesConverter({
  credentialsPath: 'credentials.json',
  verbose: true
});

const result = await converter.convert('presentation.md');
console.log(result.presentationUrl);
```

---

<!-- _backgroundColor: #2196F3 -->
<!-- _color: white -->

## Styled Slide

This slide has a blue background and white text!

---

## Lists and Tables

### Shopping List
- Apples
- Bananas
- Oranges

| Feature | Status |
|---------|--------|
| Parser  | ✅     |
| API     | ✅     |
| CLI     | ✅     |

---

# Thank You!

🎉 Happy presenting!