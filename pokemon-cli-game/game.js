import axios from 'axios';
import readline from 'readline-sync';
import chalk from 'chalk';


const API_URL = 'https://pokeapi.co/api/v2/pokemon/';

let player = { name: '', hp: 300, moves: [] };
let bot = { name: '', hp: 300, moves: [] };

async function getPokemon(name) {
  try {
    const res = await axios.get(API_URL + name.toLowerCase());
    const data = res.data;
    const moves = data.moves.slice(0, 5).map(m => ({
      name: m.move.name,
      power: Math.floor(Math.random() * 50) + 30, 
      accuracy: Math.floor(Math.random() * 30) + 70, 
      pp: Math.floor(Math.random() * 10) + 5
    }));
    return { name: data.name, hp: 300, moves };
  } catch (err) {
    console.log(chalk.red('Pokémon introuvable.'));
    return null;
  }
}

function attack(attacker, defender, move) {
  if (move.pp <= 0) {
    console.log(chalk.gray(`${attacker.name} n’a plus de PP pour ${move.name}!`));
    return;
  }

  move.pp--;
  const hitChance = Math.random() * 100;

  if (hitChance > move.accuracy) {
    console.log(chalk.yellow(`${attacker.name} a raté son attaque ${move.name}!`));
    return;
  }

  defender.hp -= move.power;
  console.log(chalk.green(`${attacker.name} utilise ${move.name} (-${move.power} HP)`));
}

function checkWinner() {
  if (player.hp <= 0) {
    console.log(chalk.red(` ${player.name} a perdu !`));
    return true;
  }
  if (bot.hp <= 0) {
    console.log(chalk.green(` ${player.name} a gagné !`));
    return true;
  }
  return false;
}

async function main() {
  console.log(chalk.blue('Bienvenue dans le mini-jeu Pokémon CLI !'));
  const playerName = readline.question('Choisis ton Pokémon: ');
  player = await getPokemon(playerName);
  if (!player) return;

  const botName = 'pikachu';
  bot = await getPokemon(botName);

  console.log(chalk.cyan(`\nTu affronteras ${bot.name} !`));

  // Combat
  while (player.hp > 0 && bot.hp > 0) {
    console.log(`\n${chalk.bold(player.name)}: ${player.hp} HP`);
    console.log(`${chalk.bold(bot.name)}: ${bot.hp} HP`);

    console.log('\nChoisis ton attaque:');
    player.moves.forEach((m, i) =>
      console.log(`${i + 1}. ${m.name} (Power: ${m.power}, PP: ${m.pp}, Accuracy: ${m.accuracy}%)`)
    );

    const choice = readline.questionInt('> ') - 1;
    const playerMove = player.moves[choice];

    attack(player, bot, playerMove);
    if (checkWinner()) break;

    // Tour du bot
    const botMove = bot.moves[Math.floor(Math.random() * bot.moves.length)];
    attack(bot, player, botMove);
    if (checkWinner()) break;
  }
}

main();
