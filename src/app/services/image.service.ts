import { Injectable, inject } from '@angular/core';
import type { Image } from '../modals/image';
import { from, of, shareReplay, type Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, concatMap, distinct, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private readonly http = inject(HttpClient);
  private readonly imagesUrl = 'api/images';
  private readonly httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private imagesCache$?: Observable<Image[]>;

  getImages(): Observable<Image[]> {
    if (!this.imagesCache$) {
      this.imagesCache$ = this.http.get<Image[]>(this.imagesUrl).pipe(
        shareReplay(1),
        catchError(this.handleError<Image[]>('getImages', []))
      );
    }
    return this.imagesCache$;
  }

  getImage(id: number): Observable<Image | undefined> {
    return this.getImages().pipe(
      map(images => images.find(img => img.id === id))
    );
  }

  addImage(image: Image): Observable<Image> {
    return this.http.post<Image>(this.imagesUrl, image, this.httpOptions).pipe(
      tap(() => this.clearCache()),
      catchError(this.handleError<Image>('addImage'))
    );
  }

  getCategories(): Observable<string> {
    return this.getImages().pipe(
      map(images => images.map(img => img.category)),
      concatMap(categories => from(categories)),
      distinct()
    );
  }

  updateImage(image: Image): Observable<Image> {
    return this.http.put<Image>(this.imagesUrl, image, this.httpOptions).pipe(
      tap(() => this.clearCache()),
      catchError(this.handleError<Image>('updateImage'))
    );
  }

  deleteImage(id: number): Observable<Image> {
    const url = `${this.imagesUrl}/${id}`;
    return this.http.delete<Image>(url, this.httpOptions).pipe(
      tap(() => this.clearCache()),
      catchError(this.handleError<Image>('deleteImage'))
    );
  }

  private clearCache(): void {
    this.imagesCache$ = undefined;
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed:`, error);
      return of(result as T);
    };
  }
}
