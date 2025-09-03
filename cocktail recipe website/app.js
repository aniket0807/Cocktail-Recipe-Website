let cocktailName = document.querySelector('.container .search-box input');
let cocktailNameText = document.querySelector('.container .cocktail-name span');
let drinkImg = document.querySelector('.container .img-box img');
let ingredientsBox = document.querySelector('.ingredients-box .ingredients');
let startMixingBtn = document.querySelector('.start-mixing-btn');
let instructionsBox = document.querySelector('.instructions');
let instruction = document.querySelector('.instructions .instruction');
let closeBtn = document.querySelector('.instructions .close-btn');

let getCocktail = async (cocktail) => {
    ingredientsBox.innerHTML = '';
    document.querySelector('.cocktail-data').style.display = 'block';
    document.querySelector('.msg').style.display = 'none';

    let url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${cocktail}`;
    
    try {
        const res = await fetch(url);
        const data = await res.json();

        if (!data.drinks) {
            document.querySelector('.cocktail-data').style.display = 'none';
            document.querySelector('.msg').style.display = 'block';
            document.querySelector('.msg').innerText = "No cocktail found!";
            return;
        }

        const myCocktail = data.drinks[0];
        drinkImg.src = myCocktail.strDrinkThumb;
        cocktailNameText.innerHTML = `<i class="fa-solid fa-martini-glass-citrus"></i> ${myCocktail.strDrink}`;

        let count = 1;
        let ingredients = [];

        for (let key in myCocktail) {
            if (key.startsWith('strIngredient') && myCocktail[key]) {
                let ingredient = myCocktail[key].trim();
                let measure = (myCocktail['strMeasure' + count] || '').trim();
                ingredients.push(`${measure} ${ingredient}`);
                count++;
            }
        }

        let ul = document.createElement('ul');
        ingredients.forEach((item) => {
            let li = document.createElement('li');
            li.innerText = item;
            ul.appendChild(li);
        });
        ingredientsBox.appendChild(ul);

        instruction.innerText = myCocktail.strInstructions;

    } catch (err) {
        console.error("Error fetching cocktail:", err);
        document.querySelector('.cocktail-data').style.display = 'none';
        document.querySelector('.msg').style.display = 'block';
        document.querySelector('.msg').innerText = "Something went wrong!";
    }
};

cocktailName.addEventListener('keyup', (e) => {
    if (e.key === 'Enter' && cocktailName.value.trim() !== '') {
        getCocktail(cocktailName.value.trim());
    }
});

startMixingBtn.addEventListener('click', () => {
    instructionsBox.style.left = '0px';
});

closeBtn.addEventListener('click', () => {
    instructionsBox.style.left = '-100%';
});
