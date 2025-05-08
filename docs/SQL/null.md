---
hide:
  - navigation
  - toc
---

<small><i>Last modified: {{ git_revision_date_localized }}</i></small>

<div class="back-button">
    <br>
    <a href="javascript:history.back()">← Back</a>
    <br>
    <br>
</div>

# NULL Values

Relational databases allow a special value NULL  
Interpretation depends on the application:  NULL could mean “Not applicable” or “unknown” or “hidden” or “not collected” or many other things

NULL or True = True  

- This expression will always be true

Is NULL equal to NULL?  

- no. bc NULL can be ✨anything✨

special syntax to test for NULL:  

- “x IS NULL” evaluates to True if x is NULL