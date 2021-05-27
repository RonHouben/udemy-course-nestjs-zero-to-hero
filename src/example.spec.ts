class FriendsList {
  friends: string[] = [];

  addFriend(name: string): void {
    this.friends.push(name);
    this.announceFriendschip(name);
  }

  announceFriendschip(name: string): void {
    console.log(`${name} is now a friend!`);
  }

  removeFriend(name: string): void {
    const idx = this.friends.indexOf(name);

    if (idx === -1) {
      throw new Error('Friend not found');
    } else {
      this.friends.splice(idx, 1);
    }
  }
}

describe('FriendList', () => {
  let friendsList: FriendsList;

  beforeEach(() => {
    friendsList = new FriendsList();
  });

  it('initializes friendsList', () => {
    expect(friendsList.friends).toHaveLength(0);
  });

  it('adds a friend to the list', () => {
    friendsList.addFriend('BFF');

    expect(friendsList.friends).toHaveLength(1);
  });

  it('announces friendschip', () => {
    friendsList.announceFriendschip = jest.fn();

    friendsList.addFriend('BFF');

    expect(friendsList.announceFriendschip).toHaveBeenCalledWith('BFF');
  });

  describe('removeFriend', () => {
    it('removes a friend from the list', () => {
      friendsList.addFriend('BFF_1');
      expect(friendsList.friends[0]).toBe('BFF_1');

      friendsList.removeFriend('BFF_1');
      expect(friendsList.friends[0]).toBeUndefined();
    });

    it('throws an error if friend does not exists', () => {
      expect(() => friendsList.removeFriend('non-existing')).toThrow(
        new Error('Friend not found'),
      );
    });
  });
});
