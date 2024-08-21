---
layout: post
title: "My LeetCode Journey"
excerpt: My target is 3 challenge a day.
---

<div class="article-list">
	{% for leetcase in site.leetcases %}
	{% unless leetcase.next %}
	<h4 style="margin: 0;">{{ leetcase.date | date: '%d %B %Y' }}</h4>
  <hr style="margin: 0;">
	{% else %}
	{% capture year %}{{ leetcase.date | date: '%Y %b %d' }}{% endcapture %}
	{% capture nyear %}{{ leetcase.next.date | date: '%Y %b %d' }}{% endcapture %}
	{% if year != nyear %}
	<h4 style="margin: 0;">{{ leetcase.date | date: '%d %B %Y' }}</h4>
  <hr style="margin: 0;">
	{% endif %}
	{% endunless %}
    ⮞ <a href="{{ leetcase.url | prepend: site.baseurl }}">{{ leetcase.title }}</a><br>
	{% endfor %}
</div>
