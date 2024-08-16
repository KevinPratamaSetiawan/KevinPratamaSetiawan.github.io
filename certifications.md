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
			<img class="cert-img" src="{{ cert.img }}" alt="{{ cert.name }}">
		</div>
	</div>
	{% endfor %}
</div>

<style>
	.cert-container{
		/* border-bottom: 4px solid black; */
		padding: 5px 0px;
		gap: 10px;
	}

	.cert-title{
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 10px;
	}

	.cert-category{
		font-size: 0.7rem;
		border: 3px dashed #60c17d;
		border-radius: 5px;
		padding: 3px;

		min-width: 60px;
		text-align: center;
	}

	.img-container {
	  max-height: 0;
	  overflow: hidden;
	  transition: max-height 0.5s ease-out;
	}
  
	.img-container.open {
	  max-height: 400px; /* or some value larger than the content */
	}

	.cert-img{
		width: 100%;
  		height: 350px;
		object-fit: contain;
	}

	.toggle-button{
		background: none; /* Remove background color */
		border: none; /* Remove border */
		padding: 0; /* Remove padding */
		margin: 0; /* Remove margin */
		font: inherit; /* Inherit font from parent element */
		cursor: pointer; /* Change cursor to pointer */
		color: inherit; /* Inherit text color from parent */
		text-align: left; /* Align text to the left */
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
			this.innerHTML = `⮟`;
		  } else {
			imgContainer.classList.add("open");
			this.innerHTML = `⮝`;
		  }
		});
	  });
	});
</script>
