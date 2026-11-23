#!/usr/bin/env bash
# Claude Code 클라우드 환경의 setup script 칸에 이 내용을 붙여 넣거나,
# "bash scripts/setup.sh"를 등록한다. 스캐폴드 전에도 안전하게 돌도록 조건부로 실행한다.
set -euo pipefail

if [ -f package.json ]; then
  npm ci || npm install
fi

pip install --quiet mpmath numpy 2>/dev/null || pip install --quiet --break-system-packages mpmath numpy
