// Mensajes de validación en español.
// El globo de "campo obligatorio" del navegador sale en el idioma del navegador
// (inglés en muchos equipos); con esto siempre aparece en español.
// Uso: <form {...spanishValidation} ...>
//
// Chrome también muestra ese mensaje como globo al pasar el mouse sobre un campo obligatorio
// vacío, sin haber enviado nada. Por eso el texto en español se pone no solo al enviar, sino
// también al pasar el mouse, al enfocar y al escribir.

function messageFor(el) {
  const v = el.validity;
  if (v.valueMissing) return 'Por favor, completa este campo.';
  if (v.typeMismatch && el.type === 'email') return 'Por favor, escribe un correo válido (ej. nombre@empresa.com).';
  if (v.typeMismatch) return 'El formato no es válido.';
  if (v.tooShort) return `Escribe al menos ${el.minLength} caracteres.`;
  if (v.tooLong) return `Escribe máximo ${el.maxLength} caracteres.`;
  if (v.patternMismatch) return el.title || 'El formato no es válido.';
  return 'Revisa este campo.';
}

// Deja en el campo el mensaje en español si es inválido, o lo limpia si ya es válido.
function sync(el) {
  if (!el || typeof el.setCustomValidity !== 'function') return;
  el.setCustomValidity('');          // se limpia primero para que el navegador vuelva a evaluar
  if (!el.validity.valid) el.setCustomValidity(messageFor(el));
}

const spanishValidation = {
  // "invalid" no burbuja; se captura en el formulario para cubrir todos sus campos
  onInvalidCapture: (e) => sync(e.target),
  // al escribir se vuelve a evaluar (al corregir el campo, el mensaje desaparece)
  onInput: (e) => sync(e.target),
  onChange: (e) => sync(e.target),
  // el globo que sale al pasar el mouse o al enfocar un campo vacío también va en español
  onMouseOverCapture: (e) => sync(e.target),
  onFocusCapture: (e) => sync(e.target),
};

export default spanishValidation;
