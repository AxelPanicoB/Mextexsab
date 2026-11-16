// Mensajes de validación en español.
// El globo de "campo obligatorio" del navegador sale en el idioma del navegador
// (inglés en muchos equipos); con esto siempre aparece en español.
// Uso: <form {...spanishValidation} ...>

function messageFor(el) {
  const v = el.validity;
  if (v.valueMissing) return 'Por favor, completa este campo.';
  if (v.typeMismatch && el.type === 'email') return 'Por favor, escribe un correo válido (ej. nombre@empresa.com).';
  if (v.typeMismatch) return 'El formato no es válido.';
  if (v.tooShort) return `Escribe al menos ${el.minLength} caracteres.`;
  if (v.tooLong) return `Escribe máximo ${el.maxLength} caracteres.`;
  if (v.patternMismatch) return 'El formato no es válido.';
  return 'Revisa este campo.';
}

const spanishValidation = {
  // "invalid" no burbujea; se captura en el formulario para cubrir todos sus campos
  onInvalidCapture: (e) => e.target.setCustomValidity(messageFor(e.target)),
  // al escribir se limpia el mensaje para que se vuelva a validar
  onInput: (e) => e.target.setCustomValidity?.(''),
};

export default spanishValidation;
