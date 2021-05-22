.. _applications:

==========================================
Applications
==========================================


Inferring fitness scores from regression models 
===============================================

Load requied data and modules
-----------------------------

.. code-block:: python

    import pandas as pd
    from dms2dfe.lib.io_data_files import read_pkl

    pkl_fh='/project_directory/data_ml/aas/regress.pkl'
    Xtest_fh='/project_directory/data_ml/aas/regress_test'

    Xtest=pd.read_csv(Xtest_fh).set_index('mutids')
    data=read_pkl(pkl_fh)

Prepare model and test dataset
------------------------------

.. code-block:: python

    model=data['RF_regress']
    Xtest=Xtest.loc[:,data['X_cols']].head()

Carry out inferences
--------------------

.. code-block:: python

    y_pred=model.predict(Xtest)

