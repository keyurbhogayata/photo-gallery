import { Injectable } from '@angular/core';
import { Image } from 'src/app/modals/image';
import { IMAGES } from '../data/IMAGES';
import { from, Observable, of, pipe } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, delay, switchMap, map, pluck, tap, concatMap } from 'rxjs/operators';
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
  // getImages() {
  //   return IMAGES;
  // }
  // getCategories(): Observable<Category[]> {
  //   return of(CATEGORIES);
  // }
  getCategories() {
    // working like a charm
    this.Categories$ = this.getImages()
      .pipe(
        map(x => x.map(x => x.category)),
        concatMap(from),
        distinct(y => y),
      )
    // .subscribe(x =>
    // {
    //   console.log("after map category",x)
    // });
    return from(this.Categories$);
    //working
    // this.Categories$ = this.getImages2().pipe(
    //   pluck('category'),
    //   distinct(),
    // );
    // return this.Categories$;

  }
  addCategory(category: string) {

    // TODo just update the image it will automatically add distinct category

    /* return this.http.post<Category>(this.imagesUrl, category, this.httpOptions).pipe(
      tap((newCategory: Category) => console.log(`added category w/ id=${newCategory}`)),
      catchError(this.handleError<Category>('addCategory'))
    ); */
  }
  getImages(): Observable<Image[]> {
    return this.http.get<Image[]>(this.imagesUrl)
      .pipe(
        tap(_ => console.log('fetched images')),
        catchError(this.handleError<Image[]>('getimages'))
      );
  }
  getImage(id: number): Image {
    const image = IMAGES.find(h => h.id === id)!;
    // console.log("getimagerx fetched id ", id);
    return image;
  }
  getImage$(id: number): Observable<Image> {
    const image = IMAGES.find(h => h.id === id)!;
    console.log("getimage$ fetched id ", image);
    const url = `${this.imagesUrl}/${id}`;
    return this.http.get<Image>(url).pipe(
      tap(_ => console.log(`fetched image id=${id}`)),
      catchError(this.handleError<Image>(`getimage id=${id}`))
    );
  }

  // removeImage(id: number): Observable<Image[]> {
  //   // IMAGES.(image);
  //   const IMAGES1 = IMAGES.filter(function (item) {
  //     return item.id != id;
  //   });
  //   return of(IMAGES1);
  // }
  // addImage(image: Image): Observable<Image[]> {
  //   IMAGES.push(image);
  //   return of(IMAGES);
  // }
  addImage(image: Image): Observable<Image> {
    return this.http.post<Image>(this.imagesUrl, image, this.httpOptions).pipe(
      tap((newImage: Image) => console.log(`added image w/ id=${newImage.id}`)),
      catchError(this.handleError<Image>('addimage'))
    );
  }
  deleteImage(id: number): Observable<Image> {
    const url = `${this.imagesUrl}/${id}`;

    return this.http.delete<Image>(url, this.httpOptions).pipe(
      tap(_ => console.log(`deleted image id=${id}`)),
      catchError(this.handleError<Image>('deleteimage'))
    );
  }

  updateImage(image: Image): Observable<any> {
    return this.http.put(this.imagesUrl, image, this.httpOptions).pipe(
      tap(_ => console.log(`updated image id=${image.id}`)),
      catchError(this.handleError<any>('updateImage'))
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
