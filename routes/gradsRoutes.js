import express from 'express'

import {
  createGrad,
  deleteGrad,
  getAllGrads,
  updateGrad,
  showStats,
} from '../controllers/gradsController.js'


const router = express.Router()

router.route('/').post(createGrad).get(getAllGrads)
router.route('/stats').get(showStats)
router.route('/:id').delete(deleteGrad).patch(updateGrad)


export default router