import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import { elements, renderLoader, clearLoader } from './views/base';

const state = {};

const controlSearch = async () => {
	const query = searchView.getInput();
	
	if(query){
		state.search = new Search(query);		
		searchView.clearInput();
		searchView.clearResults();		
		renderLoader(elements.searchRes);
		try{
			await state.search.getResults();		
			clearLoader();		
			searchView.renderResults(state.search.result);		
			// console.log(state.search.result);
		} catch (error){
			alert(error);
			clearLoader();	
		}		
	}
};

elements.searchForm.addEventListener('submit', e => {
	e.preventDefault();
	controlSearch();
});

elements.searchResPages.addEventListener('click', e => {
	const btn = e.target.closest('.btn-inline');
	if(btn){
		const goToPage = parseInt(btn.dataset.goto, 10);
		searchView.clearResults();
		searchView.renderResults(state.search.result, goToPage);
	}
	
});

const controlRecipe = async () => {
	//Get ID from url
	const id = window.location.hash.replace('#','');
	if(id){
		recipeView.clearRecipe();
		renderLoader(elements.recipe);
		state.recipe = new Recipe(id);
		try{
			await state.recipe.getRecipe();
			state.recipe.parseIngredients();
			state.recipe.calcTime();
			state.recipe.calcServings();
			clearLoader();
			recipeView.renderRecipe(state.recipe);
			// console.log(state.recipe);	
		} catch (error){
			alert(error);
		}	
	}
};

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));

