import Transaction from "../models/Transaction.model.js";

// @desc Get all transactions
// @route GET /api/v1/transactions
// @access public
export const getTransactions = async (req, res, next) => {
  try {
    const transactions = await Transaction.find();

    if (transactions.length === 0) {
      return res.status(400).json({
        success: true,
        error: "No transactions found",
      });
    }
    return res.status(200).json({
      success: true,
      count: transactions.length,
      data: transactions,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Server Error caught by 'controller'",
    });
  }
};

// @desc Add transaction
// @route POST /api/v1/transaction
// @access public
export const addTransaction = async (req, res, next) => {
  try {
    const { text, amount } = req.body;
    const transaction = await Transaction.create(req.body);
    res.status(201).json({
      success: true,
      data: transaction,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((val) => val.message);
      // console.log(messages);
      return res.status(400).json({
        success: false,
        error: messages,
      });
    } else {
      return res.status(500).json({
        success: false,
        error: "Server Error",
      });
    }
  }
};

// @desc Delete transaction
// @route DELETE /api/v1/transaction
// @access public
export const deleteTransaction = async (req, res, next) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({
        success: false,
        error: "No transaction found",
      });
    }
    // console.log(transaction);
    await transaction.deleteOne();

    return res.status(200).json({
      success: true,
      data: {},
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};
