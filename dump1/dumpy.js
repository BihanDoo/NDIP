// const lookup = req.query && (req.query.NDI_ID || req.query.NDI || req.query.NID || req.query.nid || req.query.ndi_id);
        // if (lookup) {
        //     const orClauses = [];
        //     // numeric match
        //     const asNum = Number(lookup);
        //     if (!Number.isNaN(asNum) && isFinite(asNum)) orClauses.push({ NDI_ID: asNum }, { id: asNum });

        //     // string matches
        //     orClauses.push({ NDI_ID: lookup }, { NID: lookup }, { id: lookup });

        //     // try MongoDB ObjectId match
        //     if (ObjectId.isValid(lookup)) {
        //         try { orClauses.push({ _id: new ObjectId(lookup) }); } catch (e) { /* ignore */ }
        //     }

        //     const citizen = await citizens.findOne({ $or: orClauses });
        //     if (!citizen) return res.status(404).send('Citizen not found');
        //     const { _id, ...safe } = citizen;
        //     return res.json(safe);
        // }