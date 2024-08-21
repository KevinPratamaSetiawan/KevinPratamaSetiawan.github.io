---
layout: default
permalink: /certifications/
title: Certifications
---

<div class="article-list">
	{% for cert in site.certifications %}
	<div class="cert-container">
		<div class="cert-title">
			<p class="cert-category">{{ cert.category }}</p>
			<h5 style="width: 100%; display: flex; align-items: center; justify-content: space-between;">
				<a href="{{ cert.redirect }}">{{ cert.name }}</a> 
				<button class="toggle-button" data-target="img-container-{{ forloop.index }}">⮟</button>
			</h5>
		</div>
		<div id="img-container-{{ forloop.index }}" class="img-container">
			<a href="{{ cert.redirect }}">
				<img class="cert-img" src="{{ cert.img }}" alt="{{ cert.name }}">
			</a>
		</div>
	</div>
	{% endfor %}
</div>

<script>
	document.addEventListener("DOMContentLoaded", function() {
	  const buttons = document.querySelectorAll(".toggle-button");
  
	  buttons.forEach(button => {
		button.addEventListener("click", function() {
		  const targetId = this.getAttribute("data-target");
		  const imgContainer = document.getElementById(targetId);
  
		  if (imgContainer.classList.contains("open")) {
			imgContainer.classList.remove("open");
			this.innerHTML = `⮟`;
		  } else {
			imgContainer.classList.add("open");
			this.innerHTML = `⮝`;
		  }
		});
	  });
	});
</script>
