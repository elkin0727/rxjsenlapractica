import {Observable} from 'rxjs';

export function createHTTPGETObservable(name) {
    return Observable.create(observer => {
      fetch(`/api/pokemons?search=${name}`, {
        method: 'GET'
      }).then(response => {
        return response.json();
      }).then(body => {
        observer.next(body);
        observer.complete();
      }).catch(error => {
        observer.error(error);
      });
    });
  }