const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row.seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie'); //This will give me the movie selected but not the cost of the movie i.e its price therefore do that we need to store its value in a variable
populateUI();

let ticketPrice = +movieSelect.value;  //initially the value the string so to convert it into integer we can use "parseInt" or "+" sign 
// Save selected movie index and price into local storage
function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMovieIndex', moviePrice);
}




//update the price and count of seats
function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat))  // it will give the selected seats index as a value and not as an array , we are doing this because we want that the selected seats should remain as it is even when the page is refreshed
    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex))  // to store the seats index in the local storage
    const selectedSeatsCount = selectedSeats.length;
    // console.log(selectedSeatsCount)
    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
}

//Get data from local storage and populate UI
function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

    if (selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        });
    }
    const selectedMovieIndex = localStorage.getItem('selectMovieIndex');
    if (selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex;
    }

}

//Movie Select Event
movieSelect.addEventListener('change', e => {
    ticketPrice = +e.target.value;  //it will point on the price of targeted or selected movie
    setMovieData(e.target.selectedIndex, e.target.value);  //select and pass the parameters of movie and its price because we want it to be saved even after we referesh the page
    updateSelectedCount();
});


//select the seats
container.addEventListener('click', e => {
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected');
        updateSelectedCount();
    }
});


//Initial count and total 
updateSelectedCount();