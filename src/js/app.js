import * as flsFunctions from './modules/functions.js'

flsFunctions.isWebp()

// Nav menu \\
const openNavMenu = document.querySelector('.open-btn')
const closeNavMenu = document.querySelector('.close-menu')
const navMenu = document.querySelector('.nav__menu')
const navItem = document.querySelectorAll('.nav__list-item')

openNavMenu.addEventListener('click', () => {
  navMenu.classList.add('active')
})

closeNavMenu.addEventListener('click', () => {
  navMenu.classList.remove('active')
})

