# Wraps the in-effect v2 privacy Markdown (apoyu-web privacy.md @5169da4) in the docs/site shell.
import re, subprocess, sys
src, out = sys.argv[1], sys.argv[2]
md = open(src).read()
md = re.sub(r'\A---\n.*?\n---\n', '', md, flags=re.S)  # Jekyll front matter
body = subprocess.run(['pandoc', '-f', 'gfm+hard_line_breaks', '-t', 'html5', '--wrap=none'], input=md,
                      capture_output=True, text=True, check=True).stdout
body = re.sub(r'<hr />\n?', '', body)
body = re.sub(r'<table>', '<div class="table-wrap"><table>', body)
body = body.replace('</table>', '</table></div>')
head = '''<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Apoyu Privacy Policy</title>
  <meta name="description" content="The Apoyu privacy policy in effect since 2026-08-19.">
  <meta name="color-scheme" content="dark">
  <meta name="theme-color" content="#1B0D2A">
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <a class="skip" href="#main">Skip to content</a>
  <header class="site-header">
    <div class="wrap header-inner">
      <a class="wordmark" href="index.html">Apoyü</a>
      <nav aria-label="Main">
        <ul class="nav">
        <li><a href="index.html">Home</a></li>
        <li><a href="privacy.html" aria-current="page">Privacy</a></li>
        <li><a href="terms.html">Terms</a></li>
        <li><a href="health-privacy.html">Health Privacy</a></li>
        <li><a href="support.html">Support</a></li>
        </ul>
      </nav>
    </div>
  </header>
  <main id="main" class="wrap">
    <p class="banner" role="note">An updated policy is being prepared. <a href="privacy-draft.html">Read the draft.</a></p>
    <article class="doc">
    <h1>Privacy Policy</h1>
'''
foot = '''    </article>
  </main>
  <footer class="site-footer">
    <div class="wrap">
      <p>For ages 13 and up.</p>
      <p><a href="mailto:support@apoyu.app">support@apoyu.app</a></p>
      <p>Apoyü is a wellness app, not a medical device, and does not provide medical advice.</p>
    </div>
  </footer>
</body>
</html>
'''
open(out, 'w').write(head + body + foot)
