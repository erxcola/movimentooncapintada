import { describe, it, expect } from 'vitest';
import { HERO, PESO, TIMELINE, REFLITA, CHAMADA, FOOTER, APRESENTACAO, SOBRE_CORRUPCAO, SOBRE_VOTO_FEMININO } from './site';

const allStrings = [HERO.headline, HERO.cta, PESO.title, PESO.closing, REFLITA.anchor, CHAMADA.bloco, FOOTER.question, FOOTER.copyright, APRESENTACAO.title, APRESENTACAO.body, SOBRE_CORRUPCAO.title, SOBRE_CORRUPCAO.body, SOBRE_VOTO_FEMININO.title, SOBRE_VOTO_FEMININO.body, ...PESO.history, ...REFLITA.body, ...CHAMADA.lines, ...TIMELINE.flatMap((m) => [m.year, m.title, m.description])];

const documentos = [APRESENTACAO, SOBRE_CORRUPCAO, SOBRE_VOTO_FEMININO];

describe('site copy', () => {
  it('preserves the hero headline verbatim', () => {
    expect(HERO.headline).toBe('SE VOCÊ NÃO VOTOU NO PRIMEIRO TURNO DAS ELEIÇÕES, VOCÊ AINDA PODE FAZER A DIFERENÇA!');
  });
  it('preserves the three hashtags verbatim', () => {
    expect(CHAMADA.hashtags).toEqual(['#ELENÃO', '#OFILHOTAMBÉMNÃO', '#FASCISTASNÃOPASSARÃO']);
  });
  it('keeps the original "ÁS URNAS" spelling', () => {
    expect(CHAMADA.lines).toContain('NO DIA 25 VÁ ÁS URNAS E EXERÇA ESSE DIREITO.');
  });
  it('every highlight marker is balanced', () => {
    for (const s of allStrings) {
      const count = (s.match(/\*\*/g) ?? []).length;
      expect(count % 2, `unbalanced markers in: ${s}`).toBe(0);
    }
  });
  it('has four timeline milestones ending in 1988', () => {
    expect(TIMELINE.length).toBe(4);
    expect(TIMELINE.at(-1)!.year).toBe('1988');
  });
  it('has three movement documents with title and body', () => {
    expect(documentos.map((d) => d.title)).toEqual(['APRESENTAÇÃO', 'SOBRE A CORRUPÇÃO', 'SOBRE O DIREITO AO VOTO FEMININO']);
    for (const d of documentos) {
      expect(d.body.length).toBeGreaterThan(200);
    }
  });
  it('APRESENTACAO includes the movement hashtags', () => {
    expect(APRESENTACAO.body).toContain('#MOVIMENTOONÇAPINTADA');
    expect(APRESENTACAO.body).toContain('#ELENÃO');
  });
  it('each document ends with its hashtags block', () => {
    for (const d of [SOBRE_CORRUPCAO, SOBRE_VOTO_FEMININO]) {
      expect(d.body.trimEnd()).toMatch(/#ELENÃO #OFILHOTAMBÉMNÃO #FASCISTASNÃOPASSARÃO$/);
    }
  });
  it('documents mention the second-turn election day', () => {
    expect(SOBRE_CORRUPCAO.body).toContain('No dia 25');
    expect(SOBRE_VOTO_FEMININO.body).toContain('No dia 25');
  });
});
