"""정본 원고(content/{ko,en}/story-draft.md)에서 스테이지별 content/{lang}/stage-XX.md 를 만든다.

사용: python3 scripts/split_story.py
- "## Stage N · 제목" → "# 제목"
- "[그래픽] ..." 줄 → "[그래픽:id] ..." (아래 GRAPHICS 매핑 순서대로). 매핑이 없으면 그대로 둔다(화면에 안 보이게 제거).
- 팩트체크·Junior 단락은 남겨 두고, 앱 빌드 단계(scripts/vite-content-md.ts)에서 걸러낸다.
원고를 고치면 이 스크립트를 다시 돌린다.
"""
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

# 스테이지별 [그래픽] 자리 → 컴포넌트 id (원고 등장 순서)
GRAPHICS = {
    0: ["teaser"],
    1: ["sieve", "next-prime"],
    2: ["zoom-graph"],
    3: ["complex-plane"],
    4: ["partial-sums"],
    5: ["zeta-landscape"],
    6: ["explicit-formula", "prime-sound"],
    7: ["zeta-spiral", "off-line"],
    8: ["spacing"],
    9: ["ai-results"],
}


def split(lang: str, marker: str, tag: str) -> None:
    src = ROOT / "content" / lang / "story-draft.md"
    if not src.exists():
        return
    text = src.read_text()
    parts = re.split(r"^## Stage (\d+) · ", text, flags=re.M)
    for i in range(1, len(parts), 2):
        n = int(parts[i])
        if n not in GRAPHICS:
            continue
        body = parts[i + 1]
        body = re.split(r"^## ", body, flags=re.M)[0].rstrip() + "\n"
        ids = iter(GRAPHICS[n])

        def sub(m: re.Match) -> str:
            gid = next(ids, None)
            return f"[{tag}:{gid}]{m.group(1)}" if gid else ""

        body = re.sub(rf"^\[{marker}\]([^\n]*)$", sub, body, flags=re.M)
        header = (
            f"# {body.splitlines()[0]}\n\n"
            f"<!-- 자동 생성: scripts/split_story.py ← content/{lang}/story-draft.md Stage {n}. 직접 고치지 말고 원고를 고친 뒤 다시 생성. -->\n"
        )
        out = header + "\n".join(body.splitlines()[1:]).rstrip() + "\n"
        (ROOT / "content" / lang / f"stage-{n:02d}.md").write_text(out)
        print("wrote", f"content/{lang}/stage-{n:02d}.md")


def main() -> None:
    split("ko", "그래픽", "그래픽")
    split("en", "Graphic", "graphic")
    split("ko/junior", "그래픽", "그래픽")


if __name__ == "__main__":
    main()
