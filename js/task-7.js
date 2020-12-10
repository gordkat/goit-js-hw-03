/* Напиши скрипт управления личным кабинетом интернет банка.Есть объект account в котором
необходимо реализовать методы для работы с балансом и историей транзакций. */

/*
 * Типов транзацкий всего два.
 * Можно положить либо снять деньги со счета.
 */
const Transaction = {
  DEPOSIT: 'deposit',
  WITHDRAW: 'withdraw',
};

/*
 * Каждая транзакция это объект со свойствами: id, type и amount
 */
let id = 0;
const getId = () => {
  return id++;
};

const account = {
  // Текущий баланс счета
  balance: 0,

  // История транзакций
  transactions: [],

  /*
   * Метод создает и возвращает объект транзакции.
   * Принимает сумму и тип транзакции.
   */
  createTransaction(amount, type) {
    return {
      id: getId(),
      amount,
      type,
    };
  },

  /*
   * Метод отвечающий за добавление суммы к балансу.
   * Принимает сумму танзакции.
   * Вызывает createTransaction для создания объекта транзакции
   * после чего добавляет его в историю транзакций
   */
  deposit(amount) {
    if (typeof amount !== 'number' || amount <= 0) {
      console.log('Были введены неправильные данные. Попробуйте еще раз');
      return;
    }
    this.balance += amount;
    this.transactions.push(this.createTransaction(amount, Transaction.DEPOSIT));
  },

  /*
   * Метод отвечающий за снятие суммы с баланса.
   * Принимает сумму танзакции.
   * Вызывает createTransaction для создания объекта транзакции
   * после чего добавляет его в историю транзакций.
   *
   * Если amount больше чем текущий баланс, выводи сообщение
   * о том, что снятие такой суммы не возможно, недостаточно средств.
   */
  withdraw(amount) {
    if (typeof amount !== 'number' || amount <= 0) {
      console.log('Были введены неправильные данные. Попробуйте еще раз');
      return;
    }
    if (amount > this.balance) {
      console.log('Cнятие такой суммы не возможно, недостаточно средств!');
      return;
    }
    this.balance -= amount;
    this.transactions.push(
      this.createTransaction(amount, Transaction.WITHDRAW),
    );
  },

  /*
   * Метод возвращает текущий баланс
   */
  getBalance() {
    return this.balance;
  },

  /*
   * Метод ищет и возвращает объект транзации по id
   */
  getTransactionDetails(id) {
    for (const transaction of this.transactions) {
      if (transaction.id === id) return transaction;
    }
    console.log('Транзакции с таким id не найдено');
    return null;
  },

  /*
   * Метод возвращает количество средств
   * определенного типа транзакции из всей истории транзакций
   */
  getTransactionTotal(type) {
    let transactionTotal = 0;
    for (const transaction of this.transactions) {
      if (transaction.type === type) {
        transactionTotal += transaction.amount;
      }
    }
    return transactionTotal;
  },
};
account.deposit(500);
account.deposit(10);
account.deposit(300);
account.withdraw(100);
account.withdraw(300);
account.withdraw(3000);
account.withdraw(false);
console.log(account.getTransactionDetails(7));
account.deposit('ldjfcsk');
account.deposit(true);
account.deposit(0);
account.deposit(1000);
account.withdraw(1400);
console.log(account.getTransactionTotal(Transaction.DEPOSIT));
console.log(account.getTransactionTotal(Transaction.WITHDRAW));
console.log(account.getBalance());
console.log(account.transactions);
