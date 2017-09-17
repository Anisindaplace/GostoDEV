export const styleMusicaux = [
  'Afro beat', 'Ambient', 'Blues', 'Bossa Nova',
  'chanson française', 'Chants populaires', 'Chorale',
  'Cold Wave ', 'Comédie Musicale,Country', 'Disco',
  "Drum'n'Bass", 'Electro', 'Electro folk', 'Folk',
  'Folk Rock', 'Funk', 'Gospel', 'RNB', 'Hard rock',
  'Heavy Metal', 'Hip-Hop', 'House', 'Indie', 'Rock',
  'Jazz', 'Jazz Manouche', 'Latino', 'Métal',
  'Musique Classique Musique Contemporaine', 'Musique Orientale',
  'Opera', 'Pop', 'Dancehall', 'Raï', 'Rap', 'Hip-Hop Reggae', 'Reggaeton',
  "Rythm'n'blues", 'Salsa,Slam', 'Soul', 'Variétés',
].map(value => ({
  key: value,
  value,
  text: value,
}));

export const musicienTypes = [
  'Groupe', 'Artiste solo', 'duo',
  'trio', 'quatuor', 'chorale',
].map(value => ({
  key: value,
  value,
  text: value,
}));

export const instruments = [
  'guitare', 'basse', 'batterie',
  'claviers/synthés', 'accordéon',
  'clarinettes', 'flûte', 'hautbois,saxophone',
  'tompette', 'banjo', 'contrebasse',
  'mandoline', 'ukulélé', 'violons',
].map(value => ({
  key: value,
  value,
  text: value,
}));
