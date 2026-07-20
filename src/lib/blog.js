import { expertises } from '../data/site.js';

export function getExpertiseForPost(post) {
  return expertises.find((expertise) => expertise.slug === post.data.expertise) ?? null;
}

export function formatPostDate(date) {
  return new Intl.DateTimeFormat('fr-FR', { dateStyle: 'long' }).format(date);
}
