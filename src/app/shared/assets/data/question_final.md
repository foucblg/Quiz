# Documentation questions_final.json

Le Json est composé d'un dictionnaire global avec trois clés.

## question_topics

Cette clé contient les différentes catégories de questions du quiz (str).
Actuellement, il y a 4 catégories.

Pour ajouter une catégorie, il suffit de rajouter le nom de la nouvelle catégorie dans la liste. Il faudra également ajouter un élément (int) dans la liste de la clé suivante. Il faudra également créer une nouvelle clé dans le dictionnaire questions, cette clé doit avoir le même nom que l'élément ajouté.

La liste doit avoir le même nombre d'élements que la liste de question_cycle.

## question_cycle

Cette clé contient les cycles de choix de catégorie différent (int).
Les cartes quiz apparaissent de manière aléatoire mais il doit y avoir une cohérence au niveau des catégories qui apparaissent.
Ainsi, le premier élément de la liste concerne le premier élément de la liste de question_topics. C'est le taux d'apparition des cartes de la première catégorie sur la somme des élements de la liste question_cycle.

La liste doit avoir le même nombre d'élements que la liste de question_topics.

## questions

Cette clé contient des dictionnaires qui correspondent aux différentes catégories de question_topics.

Dans chacun des dictionnaires, il y a une liste de dictionnaires qui correspondent à chacune des cartes du jeu.

### question_type

Cette clé (str) sert à définir le type de questions de la carte quiz parmi les deux types suivants : 
- QCM
- QCU

### question

Cette clé (str) contient la question de la carte quiz.

### possible_answers

Cette clé (list) sert à définir les différentes réponses affichées à l'utilisateur. Cela a été pensé pour avoir entre 2 et 4 propositions.
C'est une liste d'élément string.

Pour les QCM, il faut entrer pour la première proposition "A : " suivi de la proposition, pour la seconde, c'est "B : " suivant de la proposition, etc...

### tru_answers

Cette clé (list) sert à définir l'indice (en commançant à 0) de la bonne réponse parmis les réponses possibles définies dans possible_answers.

La liste doit-être composée d'un élément (int) unique si le question_type est QCU et est composée d'un ou plusieurs éléments (int) si le question_type est QCM.

### explanation

Cette clé (str) contient l'explication de la bonne réponse de la carte quiz.

Pour les QCM, il faut rajouter s'il n'y a pas qu'elles sont les bonnes réponses en utilisant les lettres.
Par exemple, si la deuxième et troisième proposition est juste, il faudra marquer avant l'explication : 
"Les bonnes réponses sont B et C. \n"

De plus, s'il y a des sources dans l'explication, il faut rajouter un "\n" avant le mot "Source".