import express from 'express'

import {
  createGrad,
  deleteGrad,
  getAllGrads,
  updateGrad,
  showStats,
  getAllEgressosGrads,
  getDadosEgresso
} from '../controllers/gradsController.js'


const router = express.Router()

router.route('/').post(createGrad).get(getAllGrads)
router.route('/getegressos').post(createGrad).get(getAllEgressosGrads)
router.route('/egressoProfile/:id').post(getDadosEgresso)
router.route('/stats').get(showStats)
router.route('/:id').delete(deleteGrad).patch(updateGrad)


export default router