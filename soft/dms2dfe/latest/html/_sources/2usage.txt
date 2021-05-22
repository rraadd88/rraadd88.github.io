.. _usage:

=======================
Usage
=======================

Envoking analysis pipeline
--------------------------

From bash command line, create a project directory

.. code-block:: text

    dms2dfe project_directory   


Creating input configurations
-----------------------------

Insert input parameters in the configuration files (.csv) located in `project_directory/cfg`, (detailed in :ref:`io` and :ref:`example`). 
    
.. code-block:: text

    project_directory
    |-- cfg
    |   |-- lbls                        : samples names and corresponding paths to sequqnce files (.fastq or .bam).
    |   |   |-- column  varname         : sample names,
    |   |   |-- column  fhs_1           : paths to input files (.fastq or .sam or .bam or .mut_cds)
    |   |   `-- column  fhs_2           : paths to reverse (R2) of pair ended .fastq files.
    |   |-- fit                         : pairs of input (before selection) and selected (after selection) samples.
    |   |   |-- column  unsel           : sample names of input (unselected) condition,
    |   |   `-- columns sel_1,sel_2,..  : sample names of selected condition
    |   |-- comparison                  : pairs of control (eg. untreated) and test (eg. treated) samples to be compared.
    |   |   |-- column  ctrl            : sample names of control condition,
    |   |   `-- columns test_1,test_2,..: sample names of test condition
    |   |-- repli                       : replicates to be averaged.
    |   |   |-- column  varname         : sample names of averages
    |   |   `-- columns replicate_1,replicate_2,.. : sample names of replicates
    |   |-- feats                       : custom features.
    |   |   |-- column  aasi            : amino acid number,
    |   |   `-- columns feat_1,feat_2,..: features (eg. conservation score).
    |   |-- barcodes                    : information about deplexing barcoded .fastq files.
    |   |   |-- column  fastq_R1_fh     : paths to forward (R1) fastq files,
    |   |   |-- column  fastq_R2_fh     : paths to reverse (R2) fastq files,
    |   |   |-- column  barcode_R1      : sequence of forward (R1) barcode,
    |   |   |-- column  barcode_R2      : sequence of reverse (R2) barcode,
    |   |   `-- column  fastq_fn        : file names of output files.

Run the analysis
----------------

.. code-block:: text

    dms2dfe project_directory

Outputs
-------

Outputs are created in project_directory in directories such as data_lbl , data_fit , data_comparison etc. formats of which are described in :ref:`io`.

(Optional) Alternative approaches 
---------------------------------

`dms2dfe.configure` is used for building a new project directory in which configuration files are created in directory `project_directory/cfg`. 

.. automodule:: dms2dfe.configure
   :members:
   :undoc-members:
   :show-inheritance:

Once a configuration files are created, the analysis pipeline can be envoked from python environment by following command,  

.. automodule:: dms2dfe.pipeline
   :members:
   :undoc-members:
   :show-inheritance:

