import { Injectable } from '@angular/core';
import { Image } from 'src/app/modals/image';
import { from, Observable, of} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap, concatMap } from 'rxjs/operators';
import { distinct } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private imagesUrl = 'api/images';  // URL to web api

  Categories$: Observable<string> | undefined;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(
    private http: HttpClient
  ) {

  }
  getImages$(): Observable<Image[]> {
    return this.http.get<Image[]>(this.imagesUrl)
      .pipe(
        tap(_ => console.log('fetched images')),
        catchError(this.handleError<Image[]>('getimages'))
      );
  }
  getImage$(id: number): Observable<Image> {
    return this.getImages$()
    .pipe(
      map(imgs => imgs.find(img => img.id === id)!)
    );
  }
  addImage$(image: Image): Observable<Image> {
    return this.http.post<Image>(this.imagesUrl, image, this.httpOptions)
    .pipe(
      tap((newImage: Image) => console.log(`added image id=${newImage.id} with image=${newImage}`)),
      catchError(this.handleError<Image>('addimage'))
    );
  }
  getCategories$() {
    // working like a charm
    this.Categories$ = this.getImages$()
      .pipe(
        map(x => x.map(x => x.category)),
        concatMap(from),
        distinct(y => y),
        // tap(_ => console.log("tapped",_))
      )
    return from(this.Categories$);
  }
  updateImage$(image: Image): Observable<Image> {
    return this.http.put<Image>(this.imagesUrl, image, this.httpOptions)
    .pipe(
      tap((updatedImage) => console.log(`updated image id=${updatedImage?.id},object=${updatedImage}`)),
      catchError(this.handleError<Image>('updateImage'))
    );
  }
  deleteImage$(id: number): Observable<Image> {
    const url = `${this.imagesUrl}/${id}`;
    console.log("here in delete image");
    return this.http.delete<Image>(url, this.httpOptions)
    .pipe(
      tap((deletedImage: Image) => {
        console.log(`deleted image id=${id} with image=${deletedImage}`)
        // this.getImages$().pipe(tap(_ => console.log("get images after delete", _)))
      }),
      catchError(this.handleError<Image>('deleteimage'))
    );
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
