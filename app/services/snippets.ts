import type { Snippet } from '~/interfaces/snippet.interfaces.ts';

export const snippets = ref<Snippet[]>([
	{
		id: 1,
		title: 'Select',
		language: ['html', 'js'],
		description:
			'Оформленный выпадающий список с использованием библиотеки Choices',
		category: 'Список',
		code: `<div class="section__select">
	<link
		rel="stylesheet"
		href="https://cdn.jsdelivr.net/npm/choices.js/public/assets/styles/choices.min.css"
	/>

	<select>
		<option value="">This is a placeholder</option>
		<option value="Choice 1">Choice 1</option>
		<option value="Choice 2">Choice 2</option>
		<option value="Choice 3">Choice 3</option>
	</select>

	<script src="https://cdn.jsdelivr.net/npm/choices.js/public/assets/scripts/choices.min.js"></script>
	<script>
		if (document.querySelector('select')) {
			document.querySelectorAll('select').forEach((element) => {
				new Choices(element, {
					searchEnabled: false,
					itemSelectText: '',
					shouldSort: false,
				});
			});
		}
	</script>
</div>`,
		demo: true,
	},
	{
		id: 2,
		title: 'Шапка сайта',
		language: ['html', 'css'],
		description: 'Базовая разметка хедера',
		category: 'Структура',
		code: `<header class="header">
	<style>
		.header__inner {
			display: flex;
			justify-content: space-between;
			align-items: center;
		}
	</style>

	<div class="container">
		<div class="header__inner">
			<a class="header__logo" href="/"></a>

			<div class="header__menu menu">
				<div class="menu__icon">
					<span></span>
				</div>
				<nav class="menu__body">
					<ul class="menu__list">
						<li class="menu__item">
							<a class="menu__link" href="#">Пункт 1</a>
						</li>
						<li class="menu__item">
							<a class="menu__link" href="#">Пункт 2</a>
						</li>
						<li class="menu__item">
							<a class="menu__link" href="#">Пункт 3</a>
						</li>
					</ul>
				</nav>
			</div>

			<div class="header__btns">
				<div class="header__btn">Оставить заявку</div>
			</div>
		</div>
	</div>
</header>`,
		demo: false,
	},
]);
