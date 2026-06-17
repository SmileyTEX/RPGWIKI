import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import {
  Personagem,
  PersonagemPayload,
  normalizarPersonagem,
  normalizarPersonagemPayload
} from '../models/personagem';

@Injectable({
  providedIn: 'root'
})
export class PersonagemService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = '/api/personagens/';

  listar(): Observable<Personagem[]> {
    return this.http
      .get<Personagem[]>(this.apiUrl)
      .pipe(map((lista) => lista.map((p) => normalizarPersonagem(p))));
  }

  obterPorId(id: number): Observable<Personagem> {
    return this.http
      .get<Personagem>(`${this.apiUrl}${id}/`)
      .pipe(map((p) => normalizarPersonagem(p)));
  }

  adicionar(personagem: PersonagemPayload): Observable<Personagem> {
    return this.http
      .post<Personagem>(this.apiUrl, normalizarPersonagemPayload(personagem))
      .pipe(map((p) => normalizarPersonagem(p)));
  }

  atualizar(personagem: Personagem): Observable<Personagem> {
    const payload = normalizarPersonagem(personagem);
    return this.http
      .put<Personagem>(`${this.apiUrl}${payload.id}/`, payload)
      .pipe(map((p) => normalizarPersonagem(p)));
  }

  remover(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${id}/`);
  }
}
