const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAllSchools = async (req, res) => {
    //#swagger.tags = ['Schools']
    const result = await mongodb.getDatabase().db().collection('schools').find();
    result.toArray().then((schools) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(schools);
  });
};

const getSchoolById = async (req, res) => {
    //#swagger.tags = ['Schools']

    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json({ message: 'Invalid id' });
        return;
    }

    const schoolId = new ObjectId(req.params.id);
    const result = await mongodb
        .getDatabase()
        .db()
        .collection('schools')
        .findOne({ _id: schoolId });

    if (!result) {
        res.status(404).json({ message: 'Not found' });
        return;
    }

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
};

const createSchool = async (req, res) => {
    //#swagger.tags = ['Schools']  
    const school = {
        name: req.body.name,
        district: req.body.district,
        address: req.body.address,
        contactEmail: req.body.contactEmail,
        phone: req.body.phone,
        website: req.body.website,
        establishedYear: req.body.establishedYear,
        libraryHours: req.body.libraryHours,
        active: req.body.active
    };

    const result = await mongodb
        .getDatabase()
        .db()
        .collection('schools')
        .insertOne(school);
    if (result.acknowledged) {
        res.status(204).send();
    } else {
        res.status(400).json({ message: 'Could not create school.' });
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
};

const updateSchool = async (req, res) => {
    //#swagger.tags = ['Schools']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json({ message: 'Enter a valid school ID to update school' });
    }
    const school_id = new ObjectId(req.params.id);
    const school = {
        name: req.body.name,
        district: req.body.district,
        address: req.body.address,
        contactEmail: req.body.contactEmail,
        phone: req.body.phone,
        website: req.body.website,
        establishedYear: req.body.establishedYear,
        libraryHours: req.body.libraryHours,
        active: req.body.active
    };

    const response = await mongodb
        .getDatabase()
        .db()
        .collection('schools')
        .replaceOne({ _id: school_id }, school);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the school.');
    }
}

const deleteSchool = async (req, res) => {
    //#swagger.tags = ['Schools']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json({ message: 'Enter a valid school ID to delete school' });
    }
    const school_id = new ObjectId(req.params.id);
    const response = await mongodb
        .getDatabase()
        .db()
        .collection('schools')
        .deleteOne({ _id: school_id });
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while deleting the school.');
    }
}


module.exports = {
    getAllSchools,
    getSchoolById,
    createSchool,
    updateSchool,
    deleteSchool
};
