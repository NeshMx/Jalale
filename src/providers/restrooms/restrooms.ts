import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

import { Restroom } from '../../models/restroom';

@Injectable()
export class RestroomsProvider {

  constructor(private db: AngularFireDatabase) {

  }

  public getRestroomList() {
    return this.db.list('restrooms/').valueChanges();
  }

  public addRestroom(rest: any) {
    return this.db.list('restrooms/').push(rest).then(result => {
      return result;
    });
  }

  // updateRestroom(rest: Restroom) {
  //   return this.restroomListRef.update(rest.key, rest);
  // }

  // removeRestroom(rest: Restroom) {
  //   return this.restroomListRef.remove(rest.key);
  // }

}
