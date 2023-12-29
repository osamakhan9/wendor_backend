const express = require("express")
const app = express.Router()
const crud = require('./crud.model');


app.post('/create', async (req, res) => {
	try {
		const { name, description, category } = req.body;
		const newcrud = await crud.create({
			name,
			description,
			category,
		});
		res.json(newcrud);
	} catch (error) {
		res.status(500).json({ error: 'Error creating crud.' });
	}
})

app.get('/cruds', async (req, res) => {
	try {
		const cruds = await crud.find();
		res.json(cruds);
	} catch (error) {
		res.status(500).json({ error: 'Error retrieving cruds.' });
	}

});

app.get('/SingleData/:id', async (req, res) => {
   

	try {
		const parid = req.params.id
		const cruds = await crud.find({
			_id :parid
		});
		res.send(
			cruds
		);
	} catch (error) {
		res.status(500).json({ error: 'Error retrieving cruds.' });
	}


});



app.delete('/deletecrud/:id', async (req, res) => {
	try {
		const { id } = req.params;
		await crud.findByIdAndDelete(id);
		res.json({ message: 'crud deleted successfully.' });
	} catch (error) {
		res.status(500).json({ error: 'Error deleting crud.' });
	}


});




app.put('/update-crud/:id', async (req, res) => {
	try {
		const { id } = req.params;
		const { name, description, category, active } = req.body;

		const updatedcrud = await crud.findByIdAndUpdate(
			id,
			{ name, description, category, active },
			{ new: true } // Return the updated crud
		);

		if (!updatedcrud) {
			return res.status(404).json({ error: 'crud not found.' });
		}

		res.json(updatedcrud);
	} catch (error) {
		res.status(500).json({ error: 'Error updating crud.' });
	}
});


module.exports = app