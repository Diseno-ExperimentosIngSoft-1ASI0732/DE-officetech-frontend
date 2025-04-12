interface IAnswer {
  name: string;
  description: string;
}

class ForumCommentEntity {
  id: number;
  image: string;
  name: string;
  title: string;
  description: string;
  answers: IAnswer[];

  constructor(id : number, image: string, name: string, title: string, description: string, answers: IAnswer[]) {
    this.id= id;
    this.image = image;
    this.name = name;
    this.title = title;
    this.description = description;
    this.answers = answers;
  }
}

export default ForumCommentEntity;
