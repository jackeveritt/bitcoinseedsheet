# Bitcoin Seed Sheet Generator

**Two pieces. Two locations. One complete seed.**

An offline, printable backup system for BIP39 seed phrases. Instead of writing your seed words directly onto paper, you record only their grid coordinates — which are meaningless without the specific grid used to generate them.

## How it works

1. **Generate** — Click the button. A unique, randomly shuffled grid of all 2,048 BIP39 words is created locally in your browser using `crypto.getRandomValues()`. Nothing leaves your device.
2. **Print** — Print all 5 pages: instructions, a record sheet, the word grid, and two lookup tables.
3. **Encode** — Use the lookup tables to find the grid coordinate for each seed word (e.g. `witch` → `A1`, `collapse` → `D23`). Write only the coordinates on the record sheet.
4. **Store separately** — Keep the record sheet and the word grid in two different locations. Either piece alone reveals nothing. Together they reconstruct your full seed phrase.
5. **Recover** — Bring the record sheet to the word grid. Find each coordinate to read back the original word. No app required.

## Security properties

- **No words on paper** — The record sheet contains only coordinates, not seed words.
- **Two-factor physical security** — An attacker needs both documents. Neither is useful alone.
- **Unique per generation** — Every grid is cryptographically shuffled. The same word appears at a different coordinate every time.
- **No network requests** — The tool works entirely offline via `file://`. There are no CDN dependencies, no external scripts, no analytics.
- **Auditable** — The full source is three files. View source (`Ctrl+U` / `Cmd+U`) to verify it yourself.

## Files

| File | Description |
|------|-------------|
| `index.html` | Landing page and print page markup |
| `style.css` | All styles — landing, app view, print pages |
| `app.js` | BIP39 word list, cryptographic shuffle, table builders, event handlers |
| `jack.png` | Lightning tip QR code |

## Usage

No installation or build step required. Open `index.html` in any modern browser.

For best security: disconnect from the internet before generating and printing.

## Design decisions

- **No dependencies** — No npm, no bundler, no CDN. The tool runs from a local file with no network access required.
- **`crypto.getRandomValues()` only** — `Math.random()` is never used. All randomness comes from the OS entropy source via the Web Crypto API.
- **4-character abbreviations** — The BIP39 standard guarantees every word is uniquely identifiable by its first 4 characters. The grid displays abbreviations to fit the page; full words are used internally.
- **Validation on every generation** — Before showing any output, the code verifies that every lookup entry correctly maps back to the grid. A corrupt sheet is never shown.

## Contributing

Bug reports and suggestions are welcome via [GitHub Issues](https://github.com/jackeveritt/bitcoinseedsheet/issues).

## Licence

MIT — see [LICENSE](LICENSE).

## Support

Found this useful? Send a Lightning tip to `jack@zbg.gg`.
