---
layout: default
permalink: /certifications/
title: Certifications
---

<div class="article-list">
	<p>Lorem ipsum dolor sit amet</p>

	{% for cert in site.certifications %}
	<div>
		<h2 style="display: flex; align-items: center; justify-content: space-between;">
			<a href="{{ cert.redirect }}">{{ cert.name }}</a> 
			<button class="toggle-button" data-target="img-container-{{ forloop.index }}">See {{ cert.category }} &#10597;</button>
		</h2>
		<div id="img-container-{{ forloop.index }}" class="img-container">
			<img src="{{ cert.img }}" alt="{{ cert.name }}">
		</div>
	</div>
	{% endfor %}
</div>

<style>
	.img-container {
	  max-height: 0;
	  overflow: hidden;
	  transition: max-height 0.5s ease-out;
	}
  
	.img-container.open {
	  max-height: 500px; /* or some value larger than the content */
	}
</style>

<script>
	document.addEventListener("DOMContentLoaded", function() {
	  const buttons = document.querySelectorAll(".toggle-button");
  
	  buttons.forEach(button => {
		button.addEventListener("click", function() {
		  const targetId = this.getAttribute("data-target");
		  const imgContainer = document.getElementById(targetId);
  
		  if (imgContainer.classList.contains("open")) {
			imgContainer.classList.remove("open");
			this.innerHTML = `See {{ site.certifications[forloop.index0].category }} &#10597;`;
		  } else {
			imgContainer.classList.add("open");
			this.innerHTML = `Hide {{ site.certifications[forloop.index0].category }} &#10596;`;
		  }
		});
	  });
	});
</script>
