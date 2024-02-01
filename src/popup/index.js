import '../app.css';
import App from '../components/App.svelte';

const target = document.getElementById('app');

async function render() {
  const {count} = await chrome.storage.sync.get({count: 0});

  new App({target, props: {count}});
}

document.addEventListener('DOMContentLoaded', render);
