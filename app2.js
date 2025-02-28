const searchBox=document.querySelector('.searchBox');
const searchbtn=document.querySelector('.searchbtn');
const recipecontainer=document.querySelector('.recipe-container');
const recipeCloseBtn=document.querySelector('.recipe-close-btn');
const recipeDetailsContent=document.querySelector('.recipe-details-content');


// functions to get recipes
const fetchRecipes=async(query)=>{
   recipecontainer.innerHTML="<h1>Fetching Recipes.......</h1>";
 const data=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
 const response=await data.json();
 //console.log(response.meals[0]);
 recipecontainer.innerHTML="";
 response.meals.forEach(meal=>{
     const recipediv=document.createElement('div');
     recipediv.classList.add('recipe');
     recipediv.innerHTML=`
        <img src="${meal.strMealThumb}">
        <h3>${meal.strMeal}</h3>
        <p><span>${meal.strArea}</span> Dish</p>
        <p>Belongs to <span>${meal.strCategory}</span> Category</p>
     `
     const button=document.createElement('button');
     button.textContent = "View Recipe";
     recipediv.appendChild(button);

      button.addEventListener('click',()=>{
         openRecipePopup(meal);
      });

     recipecontainer.appendChild(recipediv);
 });
}
const fetchIngredients=(meal)=>{
   let IngredientList="";
   for(let i=1;i<=20;i++)
   {
      const Ingredient=meal[`strIngredient${i}`];
      if(Ingredient)
      {
         const Measure=meal[`strMeasure${i}`];
         IngredientList+=`<li>${Measure}    ${Ingredient}</li>`
      }
   }
   return IngredientList;
}
const openRecipePopup=(meal)=>{
   recipeDetailsContent.innerHTML=`
     <h2 class="recipeName">${meal.strMeal}</h2>
     <h3>Ingredients :</h3>
     <ul class="IngredientList">${fetchIngredients(meal)}</ul>
     <div class="recipeinstruction">
        <h3>Instructions:=></h3>
        <p class="instruction">${meal.strInstructions}</p>
     </div>
   `
   recipeDetailsContent.parentElement.style.display="block";
}
searchbtn.addEventListener('click',(e)=>{
    e.preventDefault();
    const searchInput=searchBox.value.trim();
   
    fetchRecipes(searchInput);
})
recipeCloseBtn.addEventListener('click',()=>{
   recipeDetailsContent.parentElement.style.display="none";
})