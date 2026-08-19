#!/usr/bin/env bash
set -euo pipefail

project_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
vinext="${project_root}/node_modules/.bin/vinext"

if [[ ! -x "${vinext}" ]]; then
  echo "vinext is unavailable. Run npm ci before building GitHub Pages." >&2
  exit 69
fi

export GITHUB_PAGES=true
export NEXT_PUBLIC_BASE_PATH="${NEXT_PUBLIC_BASE_PATH:-/github-account-guide}"

rm -rf "${project_root}/dist"
echo "Building static GitHub Pages output at ${NEXT_PUBLIC_BASE_PATH}..."
cd "${project_root}"
"${vinext}" build

pages_dir="${project_root}/dist/client"

if [[ ! -f "${pages_dir}/index.html" ]]; then
  echo "GitHub Pages build did not produce dist/client/index.html." >&2
  exit 1
fi

# Vinext emits root-relative asset URLs. GitHub Pages project sites are served
# below /<repository-name>, so prefix the generated HTML/RSC references.
if [[ "${NEXT_PUBLIC_BASE_PATH}" != "" && "${NEXT_PUBLIC_BASE_PATH}" != "/" ]]; then
  while IFS= read -r -d '' file; do
    sed -i \
      -e "s#\"/assets/#\"${NEXT_PUBLIC_BASE_PATH}/assets/#g" \
      -e "s#\"/favicon.svg#\"${NEXT_PUBLIC_BASE_PATH}/favicon.svg#g" \
      "${file}"
  done < <(find "${pages_dir}" -type f \( -name "*.html" -o -name "*.rsc" \) -print0)
fi

echo "GitHub Pages static build complete."
