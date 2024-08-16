---
title: Projects
layout: default
permalink: /projects/
published: true
---


<div class="ProjectContainer">
  {% for project in site.projects %}

    {% if project.redirect %}

    <h3 style="display: flex; align-items: center; justify-content: space-between; gap: 10px;">
    <a href="{{ project.redirect }}">{{ project.title }}</a>
    <span style="margin: 0;">{{ project.num }}</span>
    </h3>
    <hr>
    <em>{{ project.dates }} - {{ project.datef }}</em> <br>
    {% if project.tech %}<strong>Tech Used</strong>: {{ project.tech }} <br> {% endif %}
    <strong>Description</strong>: {{ project.desc }} <br><br>

    {% else %}

    <h3 style="display: flex; align-items: center; justify-content: space-between; gap: 10px;">
    <a href="{{ project.url | prepend: site.baseurl | prepend: site.url }}">{{ project.title }}</a>
    <span style="margin: 0;">{{ project.num }}</span>
    </h3>
    <hr>
    <em>{{ project.dates }} - {{ project.datef }}</em> <br>
    {% if project.tech %}<strong>Tech Used</strong>: {{ project.tech }} <br> {% endif %}
    <strong>Description</strong>: {{ project.desc }} <br><br>

    {% endif %}

  {% endfor %}
</div>
