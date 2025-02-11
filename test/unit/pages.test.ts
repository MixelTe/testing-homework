import { it, describe, expect } from '@jest/globals';
import { Render } from './renderApp';


describe('Проверка наличия страниц', () => {
    it('В магазине должны быть страницa: главная', testPageExist("/"));
    it('В магазине должны быть страницa: каталог', testPageExist("/catalog"));
    it('В магазине должны быть страницa: условия доставки', testPageExist("/delivery"));
    it('В магазине должны быть страницa: контакты', testPageExist("/contacts"));
});

describe('Проверка страниц', () => {
    it('Cтраница "главная" должна иметь статическое содержимое', testPage("/", '<div class="Home"><div class="row"><div class="col bg-secondary text-white py-4 bg-opacity-75"><p class="display-3">Welcome to Example store!</p><p class="lead">Culpa perspiciatis corporis facilis fugit similique</p><p class="lead">Cum aut ut eveniet rem cupiditate natus veritatis quia</p></div></div><div data-testid="home-desc" class="row mb-4"><div class="col-12 col-md-4 bg-light py-3"><h1>Quickly</h1><p class="lead">Odio aut assumenda ipsam amet reprehenderit. Perspiciatis qui molestiae qui tempora quisquam</p></div><div class="col-12 col-md-4 bg-light py-3"><h1>Qualitatively</h1><p class="lead">Ut nisi distinctio est non voluptatem. Odio aut assumenda ipsam amet reprehenderit</p></div><div class="col-12 col-md-4 bg-light py-3"><h1>Inexpensive</h1><p class="lead">Perspiciatis qui molestiae qui tempora quisquam. Ut nisi distinctio est non voluptatem</p></div></div><div class="row mb-4"><div class="col-12py-3"><p>Sed voluptatum quis voluptates laudantium incidunt laudantium. Illo non quos eos vel ipsa. Explicabo itaque est optio neque rerum provident enim qui sed. Corrupti commodi voluptatem vero soluta hic.</p><p>Modi corporis consectetur aliquid sit cum tenetur enim. Sed voluptatum quis voluptates laudantium incidunt laudantium. Illo non quos eos vel ipsa. Explicabo itaque est optio neque rerum provident enim qui sed. Corrupti commodi voluptatem vero soluta hic.</p></div></div></div>'));
    it('Cтраница "условия доставки" должна иметь статическое содержимое', testPage("/delivery", '<div class="Delivery"><div class="row"><div class="col"><h1>Delivery</h1><p>Deserunt occaecati tempora. Qui occaecati est aliquam. Enim qui nulla ipsam. Incidunt impedit enim consequuntur amet at consequuntur vero. Dolor et ad facere asperiores iste est praesentium quaerat iure. Quibusdam mollitia autem quos voluptas quia est doloremque corporis et. Sed fuga quasi esse perspiciatis fugit maxime. Qui quidem amet.</p><img class="Image w-25 mb-4" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkMAYAADkANVKH3ScAAAAASUVORK5CYII="><p>Dolores magnam consequatur iste aliquam qui sint non ab. Culpa saepe omnis. Recusandae vel aperiam voluptates harum. Perspiciatis qui molestiae qui tempora quisquam. Mollitia voluptatum minus laboriosam. Dolor maiores possimus repudiandae praesentium hic eos. Veritatis et repellat.</p><p>Pariatur nisi nobis hic ut facilis sunt rerum id error. Soluta nihil quisquam quia rerum illo. Ipsam et suscipit est iure incidunt quasi et eum. Culpa libero dignissimos recusandae. In magni sapiente non voluptas molestias. Deserunt quos quo placeat sunt. Ea necessitatibus dolores eaque ex aperiam sunt eius. Saepe aperiam aut. Quaerat natus consequatur aut est id saepe et aut facilis.</p></div></div></div>'));
    it('Cтраница "контакты" должна иметь статическое содержимое', testPage("/contacts", '<div class="Contacts"><div class="row"><div class="col"><h1>Contacts</h1><p>Ut non consequatur aperiam ex dolores. Voluptatum harum consequatur est totam. Aut voluptatum aliquid aut optio et ea. Quaerat et eligendi minus quasi. Culpa voluptatem voluptatem dolores molestiae aut quos iure. Repellat aperiam ut aliquam iure. Veritatis magnam quisquam et dolorum recusandae aut.</p><p>Molestias inventore illum architecto placeat molestias ipsam facilis ab quo. Rem dolore cum qui est reprehenderit assumenda voluptatem nisi ipsa. Unde libero quidem. Excepturi maiores vel quia. Neque facilis nobis minus veniam id. Eum cum eveniet accusantium molestias voluptas aut totam laborum aut. Ea molestiae ullam et. Quis ea ipsa culpa eligendi ab sit ea error suscipit. Quia ea ut minus distinctio quam eveniet nihil. Aut voluptate numquam ipsa dolorem et quas nemo.</p></div></div></div>'));
});


function testPageExist(page: string)
{
    return () =>
    {
        const { getByTestId } = Render(page);
        const pageContent = getByTestId("pageContent");
        expect(pageContent.innerHTML).toBeTruthy();
    }
}

function testPage(page: string, html: string)
{
    return () =>
    {
        const { getByTestId } = Render(page);
        const pageContent = getByTestId("pageContent");
        expect(pageContent.innerHTML).toBe(html);
    }
}
