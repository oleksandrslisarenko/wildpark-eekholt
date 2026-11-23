// Formulare senden per FormSubmit an die hinterlegte Adresse (läuft auf jedem statischen Hosting).
const ENDPOINT = 'https://formsubmit.co/ajax/slisarenko.alex@gmail.com';

export function wireForms(root: ParentNode = document) {
  const ru = document.documentElement.lang === 'ru';
  root.querySelectorAll<HTMLFormElement>('form[data-send]').forEach((form) => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const out = form.querySelector<HTMLElement>('[data-msg]');
      const btn = form.querySelector<HTMLButtonElement>('button[type=submit]');
      if (!form.checkValidity()) { form.reportValidity(); return; }
      const data = Object.fromEntries(new FormData(form).entries());
      btn && (btn.disabled = true);
      form.dataset.state = 'sending';
      try {
        const r = await fetch(ENDPOINT, {
          method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({ ...data, Sprache: ru ? 'RU' : 'DE', Seite: location.pathname, _subject: `Wildpark Eekholt: ${form.dataset.send}`, _template: 'table', _captcha: 'false' }),
        });
        if (!r.ok) throw new Error(String(r.status));
        form.dataset.state = 'done';
        if (out) out.textContent = form.dataset.ok || (ru ? 'Спасибо! Ваше сообщение получено.' : 'Vielen Dank! Ihre Nachricht ist bei uns angekommen.');
        form.reset();
      } catch {
        form.dataset.state = 'error';
        if (out) out.textContent = ru ? 'Не удалось отправить. Попробуйте ещё раз или позвоните нам: 04327 9923-0.' : 'Senden hat nicht geklappt. Bitte versuchen Sie es noch einmal oder rufen Sie uns an: 04327 9923-0.';
      } finally { btn && (btn.disabled = false); }
    });
  });
}
