export const translations = {
  en: {
    // ReviewSelector
    experienceQuestion: 'How was your visit?',
    lovedIt: 'Loved it',
    notSoGreat: 'Not so great',

    // StressPointsSelector
    stressPointsTitle: 'Select up to 3 things to stress on',
    serviceQuality: 'Service Quality',
    staffFriendliness: 'Staff Friendliness',
    priceValue: 'Price/Value',
    speedEfficiency: 'Speed/Efficiency',
    locationConvenience: 'Location Convenience',
    addYourOwn: '+ Add your own',
    enterYourOwn: 'Enter your own...',
    add: 'Add',
    cancel: 'Cancel',

    // ReviewEditor
    reviewAssistant: 'Review assistant',
    generatedPlaceholder: 'Generated review will appear here...',
    writePlaceholder: 'Write your review here...',
    generateReview: 'Generate Review',
    generating: 'Generating...',
    regenerate: 'Regenerate',
    regenerating: 'Regenerating...',
    copied: 'Copied!',
    copy: 'Copy',
    regenerationsLeft: (n) => `${n} regeneration${n !== 1 ? 's' : ''} left`,
    noMoreRegenerations: 'No more regenerations',

    // Instructions
    nextSteps: 'Next Steps',
    goToReviews: 'Go to Google Maps Reviews',
    howToSubmit: 'How to submit your review:',
    step1: 'Click the link above to open Google Reviews',
    step2: 'Paste the review you copied',
    step3: 'Click "Post" to submit your review',

    // Errors
    errorGenerateOnly: 'We only generate positive reviews. Please select "Loved it" to generate a review, or write your own below.',
    errorGenerateFailed: 'Failed to generate review. Please try again.',
  },
  es: {
    // ReviewSelector
    experienceQuestion: '¿Cómo fue tu visita?',
    lovedIt: 'Me encantó',
    notSoGreat: 'No tan bien',

    // StressPointsSelector
    stressPointsTitle: 'Elige hasta 3 aspectos a destacar',
    serviceQuality: 'Calidad del servicio',
    staffFriendliness: 'Amabilidad del personal',
    priceValue: 'Precio/calidad',
    speedEfficiency: 'Rapidez/eficiencia',
    locationConvenience: 'Ubicación conveniente',
    addYourOwn: '+ Añadir otro',
    enterYourOwn: 'Escribe el tuyo...',
    add: 'Añadir',
    cancel: 'Cancelar',

    // ReviewEditor
    reviewAssistant: 'Asistente de reseñas',
    generatedPlaceholder: 'La reseña generada aparecerá aquí...',
    writePlaceholder: 'Escribe tu reseña aquí...',
    generateReview: 'Generar reseña',
    generating: 'Generando...',
    regenerate: 'Regenerar',
    regenerating: 'Regenerando...',
    copied: '¡Copiado!',
    copy: 'Copiar',
    regenerationsLeft: (n) => n === 1 ? '1 regeneración restante' : `${n} regeneraciones restantes`,
    noMoreRegenerations: 'No hay más regeneraciones',

    // Instructions
    nextSteps: 'Próximos pasos',
    goToReviews: 'Ir a reseñas de Google Maps',
    howToSubmit: 'Cómo publicar tu reseña:',
    step1: 'Haz clic en el enlace arriba para abrir Google Reviews',
    step2: 'Pega la reseña que copiaste',
    step3: 'Haz clic en "Publicar" para enviar tu reseña',

    // Errors
    errorGenerateOnly: 'Solo generamos reseñas positivas. Selecciona "Me encantó" para generar una reseña o escribe la tuya abajo.',
    errorGenerateFailed: 'Error al generar la reseña. Inténtalo de nuevo.',
  },
}

/** Detect if browser prefers Spanish */
export function getBrowserLanguage() {
  if (typeof navigator === 'undefined') return 'en'
  const lang = navigator.language || navigator.userLanguage || ''
  return lang.toLowerCase().startsWith('es') ? 'es' : 'en'
}
